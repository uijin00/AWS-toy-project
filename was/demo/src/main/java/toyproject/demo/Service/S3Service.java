package toyproject.demo.Service;

import com.amazonaws.services.s3.AmazonS3;

import com.amazonaws.services.s3.model.ListObjectsV2Result;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class S3Service {
    private final AmazonS3 s3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public List<String> getMusicFiles() {
        ListObjectsV2Result result = s3Client.listObjectsV2(bucket);
        return result.getObjectSummaries().stream()
                .filter(s3ObjectSummary -> s3ObjectSummary.getKey().endsWith(".mp3"))
                .map(s3ObjectSummary -> s3Client.getUrl(bucket, s3ObjectSummary.getKey()).toString())
                .collect(Collectors.toList());
    }

}
